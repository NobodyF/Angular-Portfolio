import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface StackGroup {
  label: string;
  items: string[];
  primary?: boolean; // core skills get the filled badge style
}

interface NetNode { x: number; y: number; layer: number; index: number; }
interface NetEdge { x1: number; y1: number; x2: number; y2: number; }
interface NetRoute {
  label: string;      // output the route ends in
  color: string;
  d: string;          // SVG path through one node per layer
  nodes: string[];    // "layer-index" keys of nodes on the route
  begin: string;      // stagger for the travelling signal
}

/** Layer x-positions and sizes for the network graphic (viewBox 1000 × 720). */
const LAYER_X = [170, 400, 630, 840];
const LAYER_SIZE = [4, 6, 6, 3];
const TOP = 110;
const BOTTOM = 650;

@Component({
  selector: 'app-tech-stack',
  templateUrl: './tech-stack.component.html',
  styleUrls: ['./tech-stack.component.css']
})
export class TechStackComponent implements OnInit {
  groups: StackGroup[] = [
    { label: 'Build', primary: true, items: ['Python', 'PyTorch', 'LangChain', 'Azure OpenAI', 'YOLO'] },
    { label: 'Ship', items: ['FastAPI', 'Azure Container Apps', 'Azure DevOps', 'Docker'] },
    { label: 'Web', items: ['Angular', 'TypeScript', 'Django'] }
  ];
  previously = ['Solidity', 'Ethereum', 'Hardhat'];

  // ---- Network graphic ----
  readonly captions = ['INPUT', 'EMBED', 'REASON', 'OUTPUT'];
  readonly inputs = ['docs', 'images', 'code', 'data'];
  readonly layerX = LAYER_X;
  nodes: NetNode[] = [];
  edges: NetEdge[] = [];
  routes: NetRoute[] = [];
  hovered: number | null = null;
  /** Travelling signals are rendered only in the browser and when motion is allowed. */
  motion = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.buildNetwork();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }

  private buildNetwork() {
    const pos = (layer: number, index: number) => {
      const n = LAYER_SIZE[layer];
      const gap = (BOTTOM - TOP) / (n + 1);
      return { x: LAYER_X[layer], y: Math.round(TOP + gap * (index + 1)) };
    };

    LAYER_SIZE.forEach((n, layer) => {
      for (let i = 0; i < n; i++) this.nodes.push({ ...pos(layer, i), layer, index: i });
    });

    for (let layer = 0; layer < LAYER_SIZE.length - 1; layer++) {
      for (let a = 0; a < LAYER_SIZE[layer]; a++) {
        for (let b = 0; b < LAYER_SIZE[layer + 1]; b++) {
          const p = pos(layer, a), q = pos(layer + 1, b);
          this.edges.push({ x1: p.x, y1: p.y, x2: q.x, y2: q.y });
        }
      }
    }

    // Three routes: docs → RAG, images → Vision, code → Agents
    const defs = [
      { label: 'RAG', color: '#ccf381', path: [0, 1, 2, 0] },
      { label: 'Vision', color: '#a99bff', path: [1, 3, 4, 1] },
      { label: 'Agents', color: '#ffffff', path: [2, 4, 1, 2] }
    ];
    this.routes = defs.map((r, i) => {
      const pts = r.path.map((idx, layer) => pos(layer, idx));
      return {
        label: r.label,
        color: r.color,
        d: 'M' + pts.map(p => `${p.x} ${p.y}`).join(' L'),
        nodes: r.path.map((idx, layer) => `${layer}-${idx}`),
        begin: `${i * 1.1}s`
      };
    });
  }

  /** Route index a node belongs to (first match), or -1. */
  routeOf(node: NetNode): number {
    return this.routes.findIndex(r => r.nodes.includes(`${node.layer}-${node.index}`));
  }

  outputNode(routeIndex: number): NetNode {
    return this.nodes.find(n => n.layer === LAYER_SIZE.length - 1 && n.index === routeIndex)!;
  }

  inputNode(i: number): NetNode {
    return this.nodes.find(n => n.layer === 0 && n.index === i)!;
  }

  isDimmed(routeIndex: number): boolean {
    return this.hovered !== null && this.hovered !== routeIndex;
  }
}
