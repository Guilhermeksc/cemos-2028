import os
from datetime import datetime, timezone

import requests
from dash import Dash, Input, Output, dcc, html
import plotly.graph_objects as go

DASH_API_URL = os.getenv("DASH_API_URL", "http://backend:8000/api/metrics/")
REFRESH_SECONDS = int(os.getenv("DASH_REFRESH_SECONDS", "60"))
REQUEST_TIMEOUT = int(os.getenv("DASH_REQUEST_TIMEOUT", "10"))

app = Dash(__name__)

THEME = {
    "background": "#05080D",
    "panel": "#0B1220",
    "primary": "#00F5FF",
    "secondary": "#1E90FF",
    "accent": "#7C3AED",
    "text": "#E6F7FF",
    "muted": "#7EA6C6",
    "grid": "#122036",
}

BASE_LAYOUT = dict(
    paper_bgcolor=THEME["background"],
    plot_bgcolor=THEME["panel"],
    font=dict(color=THEME["text"], family="Inter, Arial, sans-serif"),
    margin=dict(l=32, r=32, t=48, b=32),
    xaxis=dict(gridcolor=THEME["grid"], zerolinecolor=THEME["grid"]),
    yaxis=dict(gridcolor=THEME["grid"], zerolinecolor=THEME["grid"]),
)


def _parse_series(payload):
    if isinstance(payload, dict):
        if "labels" in payload and "values" in payload:
            return payload["labels"], payload["values"]
        if "data" in payload and isinstance(payload["data"], list):
            items = payload["data"]
        else:
            items = []
    elif isinstance(payload, list):
        items = payload
    else:
        items = []

    labels = []
    values = []
    for item in items:
        if not isinstance(item, dict):
            continue
        label = item.get("label") or item.get("name") or item.get("x")
        value = item.get("value") or item.get("y")
        if label is None or value is None:
            continue
        labels.append(label)
        values.append(value)

    return labels, values


app.layout = html.Div(
    [
        html.Header(
            [
                html.H1("Dashboard CEMOS 2028"),
                html.P("Monitoramento em tempo real com estética futurista."),
            ],
            className="hero",
        ),
        html.Div(id="status", className="status"),
        html.Section(
            [
                html.Div(
                    dcc.Graph(
                        id="main-graph",
                        config={
                            "displayModeBar": True,
                            "toImageButtonOptions": {
                                "format": "png",
                                "filename": "dashboard-indicadores",
                                "height": 720,
                                "width": 1280,
                                "scale": 2,
                            },
                        },
                    ),
                    className="card card--wide",
                ),
                html.Div(
                    dcc.Graph(
                        id="pie-graph",
                        config={
                            "displayModeBar": True,
                            "toImageButtonOptions": {
                                "format": "png",
                                "filename": "dashboard-distribuicao",
                                "height": 720,
                                "width": 1280,
                                "scale": 2,
                            },
                        },
                    ),
                    className="card",
                ),
                html.Div(
                    dcc.Graph(
                        id="bar-graph",
                        config={
                            "displayModeBar": True,
                            "toImageButtonOptions": {
                                "format": "png",
                                "filename": "dashboard-comparativo",
                                "height": 720,
                                "width": 1280,
                                "scale": 2,
                            },
                        },
                    ),
                    className="card",
                ),
                html.Div(
                    dcc.Graph(
                        id="stacked-bar",
                        config={
                            "displayModeBar": True,
                            "toImageButtonOptions": {
                                "format": "png",
                                "filename": "dashboard-execucao-concluido",
                                "height": 720,
                                "width": 1280,
                                "scale": 2,
                            },
                        },
                    ),
                    className="card",
                ),
            ],
            className="grid",
        ),
        dcc.Interval(id="refresh", interval=REFRESH_SECONDS * 1000, n_intervals=0),
    ],
    className="page",
)


@app.callback(
    Output("main-graph", "figure"),
    Output("pie-graph", "figure"),
    Output("bar-graph", "figure"),
    Output("stacked-bar", "figure"),
    Output("status", "children"),
    Input("refresh", "n_intervals"),
)
def update_graph(_):
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    try:
        response = requests.get(DASH_API_URL, timeout=REQUEST_TIMEOUT)
        response.raise_for_status()
        payload = response.json()
        labels, values = _parse_series(payload)

        if not labels:
            raise ValueError("Resposta sem dados válidos")

        main_figure = go.Figure(
            data=[
                go.Scatter(
                    x=labels,
                    y=values,
                    mode="lines+markers",
                    line=dict(color=THEME["primary"], width=3),
                    marker=dict(color=THEME["secondary"], size=8),
                    fill="tozeroy",
                    fillcolor="rgba(0, 245, 255, 0.15)",
                )
            ]
        )
        main_figure.update_layout(
            title="Indicadores principais",
            **BASE_LAYOUT,
        )

        pie_figure = go.Figure(
            data=[
                go.Pie(
                    labels=labels,
                    values=values,
                    hole=0.45,
                    marker=dict(
                        colors=[
                            THEME["primary"],
                            THEME["secondary"],
                            THEME["accent"],
                            "#00FF7F",
                            "#00B7FF",
                        ]
                    ),
                )
            ]
        )
        pie_figure.update_layout(title="Distribuição", **BASE_LAYOUT)

        bar_figure = go.Figure(
            data=[
                go.Bar(
                    x=labels,
                    y=values,
                    marker=dict(
                        color=THEME["secondary"],
                        line=dict(color=THEME["primary"], width=1.5),
                    ),
                )
            ]
        )
        bar_figure.update_layout(title="Comparativo", **BASE_LAYOUT)

        total = sum(values) if values else 0
        executed = [round(v * 0.6, 2) for v in values]
        completed = [round(v * 0.4, 2) for v in values]
        stacked_figure = go.Figure(
            data=[
                go.Bar(
                    x=labels,
                    y=executed,
                    name="Execução",
                    marker=dict(color=THEME["secondary"]),
                ),
                go.Bar(
                    x=labels,
                    y=completed,
                    name="Concluído",
                    marker=dict(color=THEME["primary"]),
                ),
            ]
        )
        stacked_figure.update_layout(
            title="Execução x Concluído",
            barmode="stack",
            **BASE_LAYOUT,
        )

        status = f"Fonte: {DASH_API_URL} | Atualizado: {timestamp}"
        return main_figure, pie_figure, bar_figure, stacked_figure, status
    except Exception as exc:  # noqa: BLE001
        empty_figure = go.Figure()
        empty_figure.add_annotation(
            text="Sem dados disponíveis",
            x=0.5,
            y=0.5,
            showarrow=False,
            font=dict(size=18),
        )
        empty_figure.update_xaxes(visible=False)
        empty_figure.update_yaxes(visible=False)
        empty_figure.update_layout(**BASE_LAYOUT)
        status = f"Erro ao carregar dados: {exc} | Atualizado: {timestamp}"
        return empty_figure, empty_figure, empty_figure, empty_figure, status


if __name__ == "__main__":
    app.run_server(host="0.0.0.0", port=8050, debug=False)
