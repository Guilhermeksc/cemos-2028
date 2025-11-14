import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, forkJoin, of } from 'rxjs';

interface MindNode {
  title: string;
  children?: MindNode[];
}

interface NodeWithId extends MindNode {
  id: string;
  parentId?: string;
  level?: number;
  children?: NodeWithId[];
}

@Component({
  selector: 'app-mapa-mental',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './mapa-mental.html',
  styleUrls: ['./mapa-mental.scss']
})
export class MapaMental implements OnInit {
  // basePath: served assets base in the running app. Adjust if your app serves public files under a different path.
  @Input() basePath = '/assets/content';
  // relative folder under basePath, e.g. 'geopolitica-ri/json'
  @Input() folder = 'geopolitica-ri/json';
  // optional explicit list of files (filenames only) to load from the folder
  @Input() files?: string[];
  // If true, require that files are explicitly provided via [files]. Default true for safety.
  @Input() requireExplicitFiles = true;

  // diagnostics: URLs attempted and successfully loaded
  attemptedUrls: string[] = [];
  loadedUrls: string[] = [];

  nodes: NodeWithId[] = [];
  loading = false;
  error?: string;

  private idCounter = 0;
  private expanded = new Set<string>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.load();
  }

  private fetchFile(url: string) {
    return this.http.get<MindNode | MindNode[]>(url).pipe(catchError(() => of(null)));
  }

  load(): void {
    this.loading = true;
    this.error = undefined;
    const folderUrl = `${this.basePath}/${this.folder}`.replace(/\/+/g, '/');

    // Strict behavior: require caller to provide `files` (absolute paths or filenames relative to folderUrl).
    // This avoids the component guessing or attempting index fallbacks.
    if (!this.files || this.files.length === 0) {
      this.attemptedUrls = [];
      this.error = `Nenhum arquivo especificado. Para segurança e reuso, passe a lista de paths via [files] no componente chamador.`;
      this.nodes = [];
      this.loading = false;
      return;
    }

    const urlsToTry = this.files.map(f => {
      if (/^https?:\/\//i.test(f) || f.startsWith('/')) return f;
      return `${folderUrl}/${f}`;
    });
    this.attemptedUrls = urlsToTry.slice();

    const requests = urlsToTry.map(u => this.fetchFile(u));
    forkJoin(requests).subscribe(results => {
      this.loadedUrls = [];
      const found: MindNode[] = [];
      for (let i = 0; i < results.length; i++) {
        const r = results[i];
        if (!r) continue;
        this.loadedUrls.push(urlsToTry[i]);
        if (Array.isArray(r)) {
          // array of root nodes
          found.push(...r as MindNode[]);
        } else {
          found.push(r as MindNode);
        }
      }

        if (found.length === 0) {
          this.error = `Nenhum arquivo JSON encontrado em ${folderUrl}. Forneça um \"index.json\" ou passe a lista de arquivos via \'files\'`;
          this.nodes = [];
          this.loading = false;
          return;
        }

  this.nodes = this.buildNodesWithIds(found);
        // initial: collapse all
        this.expanded.clear();
        this.loading = false;
      }, err => {
        this.error = 'Erro ao carregar arquivos JSON.';
        this.loading = false;
      });
  }

  private buildNodesWithIds(roots: MindNode[]): NodeWithId[] {
    this.idCounter = 0;
    const nodes: NodeWithId[] = [];
    roots.forEach((r, idx) => {
      nodes.push(this.assignIds(r, `root-${idx}`, undefined, 0));
    });
    return nodes;
  }

  private assignIds(node: MindNode, prefix: string, parentId?: string, level = 0): NodeWithId {
    const id = `${prefix}-${this.idCounter++}`;
    const out: NodeWithId = { id, title: node.title, parentId, level };
    if (node.children && node.children.length) {
      out.children = node.children.map((c, i) => this.assignIds(c, `${id}`, id, level + 1));
    }
    return out;
  }

  // toggle behavior: clicking a node toggles it (retrair se aberto). When expanding, only the clicked
  // node is opened (its immediate children shown). When expanding a node, siblings at the same level
  // are collapsed to keep only one open per parent.
  onNodeClick(node: NodeWithId, isRoot = false): void {
    if (this.isExpanded(node.id)) {
      // collapse this node
      this.expanded.delete(node.id);
      return;
    }

    // expanding: collapse siblings
    this.collapseSiblings(node);

    // expand only this node (do not recursively expand children)
    this.expanded.add(node.id);
    // if root, also collapse other root nodes that are open
    if (isRoot) {
      for (const r of this.nodes) {
        if (r.id !== node.id) this.expanded.delete(r.id);
      }
    }
  }

  private collapseSiblings(node: NodeWithId): void {
    const parentId = node.parentId;
    if (!parentId) {
      // node is root: collapse other roots
      for (const r of this.nodes) {
        if (r.id !== node.id) this.expanded.delete(r.id);
        // also recursively collapse all descendants of other roots
        this.recursiveCollapse(r);
      }
      return;
    }

    // find parent node
    const parent = this.findNodeById(parentId, this.nodes);
    if (!parent || !parent.children) return;
    for (const s of parent.children) {
      if (s.id !== node.id) {
        this.expanded.delete(s.id);
        this.recursiveCollapse(s);
      }
    }
  }

  private recursiveCollapse(node: NodeWithId): void {
    this.expanded.delete(node.id);
    node.children?.forEach(c => this.recursiveCollapse(c));
  }

  private findNodeById(id: string, list: NodeWithId[]): NodeWithId | undefined {
    for (const n of list) {
      if (n.id === id) return n;
      if (n.children) {
        const found = this.findNodeById(id, n.children);
        if (found) return found;
      }
    }
    return undefined;
  }

  isExpanded(id: string): boolean {
    return this.expanded.has(id);
  }

  // small helper to compute subtle background per level
  levelBg(level = 0): string {
    // level mapping (use more vibrant tones as requested):
    // level 0: root (keep white)
    // level 1: purple
    // level 2: blue
    // level 3: green
    // level 4: yellow
    const map: { [k: number]: string } = {
      0: '#ffffff',
      1: '#8A2BE2', // blueviolet (vibrant purple)
      2: '#1E88E5', // vivid blue
      3: '#00C853', // vivid green
      4: '#FFD600'  // vibrant yellow
    };
    // For deeper levels, slightly desaturate by cycling through the palette
    return map[level] ?? map[(level % 4) + 1] ?? '#ffffff';
  }
}
