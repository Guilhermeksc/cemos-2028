from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from django_cemos2028.apps.telemetry.serializers import PdfDownloadEventSerializer
from django_cemos2028.observability.metrics import track_pdf_download


class PdfDownloadEventView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = PdfDownloadEventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        origem = serializer.validated_data.get("origem", "desconhecida")
        user = request.user if request.user.is_authenticated else None

        track_pdf_download(user=user, origem=origem)

        return Response({"status": "registered"}, status=status.HTTP_201_CREATED)
