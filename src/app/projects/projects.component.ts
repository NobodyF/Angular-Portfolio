import { Component } from '@angular/core';

export type ProjectCategory = 'GenAI-LLM' | 'Computer Vision' | 'Web3' | 'Other';

export interface Project {
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  repoUrl: string | null;
  icon: string;
}

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css'],
    standalone: false
})
export class ProjectsComponent {
  categories: Array<'All' | ProjectCategory> = ['All', 'GenAI-LLM', 'Computer Vision', 'Web3', 'Other'];
  activeCategory: 'All' | ProjectCategory = 'All';

  projects: Project[] = [
    {
      title: 'DocDrift',
      description: 'Agentic pipeline that detects drift between Python code and its documentation, using LLM matcher and judge agents to report every mismatch with evidence.',
      category: 'GenAI-LLM',
      tags: ['Python', 'LLM Agents', 'CLI'],
      repoUrl: null,
      icon: 'assets/icons/docdrift.svg'
    },
    {
      title: 'AI PR Enricher',
      description: 'Service that summarizes GitHub pull requests with Azure OpenAI and posts structured review comments, triggered by webhooks or CLI.',
      category: 'GenAI-LLM',
      tags: ['Python', 'Azure OpenAI', 'GitHub API'],
      repoUrl: null,
      icon: 'assets/icons/pr-enricher.svg'
    },
    {
      title: 'AI-TRAIN',
      description: 'YOLOv8 training toolkit with dataset cleaning, randomization, and training scripts used to build drone-based object detection models.',
      category: 'Computer Vision',
      tags: ['Python', 'YOLOv8', 'PyTorch'],
      repoUrl: 'https://github.com/NobodyF/AI-TRAIN',
      icon: 'assets/icons/ai-train.svg'
    },
    {
      title: 'Leaf Detector',
      description: 'YOLO pipeline for detecting and counting leaves and fruits on potted plants, with a web-based tool for reviewing and correcting predictions.',
      category: 'Computer Vision',
      tags: ['Python', 'YOLO', 'Annotation'],
      repoUrl: 'https://github.com/NobodyF/leaf_detector',
      icon: 'assets/icons/leaf-detector.svg'
    },
    {
      title: 'WEB3-PlantHyb',
      description: 'Ethereum dApp for plant hybridization built with Solidity and Hardhat on the Sepolia testnet, backed by a Django web application.',
      category: 'Web3',
      tags: ['Solidity', 'Hardhat', 'Django'],
      repoUrl: 'https://github.com/NobodyF/WEB3-PlantHyb',
      icon: 'assets/icons/planthyb.svg'
    },
    {
      title: 'Web3 Documents',
      description: 'Document management platform that anchors records on Ethereum smart contracts, combining a Django backend with on-chain verification.',
      category: 'Web3',
      tags: ['Solidity', 'Django', 'Ethereum'],
      repoUrl: 'https://github.com/NobodyF/web3_documents',
      icon: 'assets/icons/web3-docs.svg'
    },
    {
      title: 'Allergen Scanner',
      description: 'Android app that detects food allergens from package photos using a custom YOLOv8 TensorFlow Lite model with on-device OCR in multiple languages.',
      category: 'Other',
      tags: ['Kotlin', 'TensorFlow Lite', 'ML Kit'],
      repoUrl: 'https://github.com/NobodyF/AllergenScanner',
      icon: 'assets/icons/allergen-scanner.svg'
    }
  ];

  get filteredProjects(): Project[] {
    if (this.activeCategory === 'All') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.activeCategory);
  }

  countFor(category: 'All' | ProjectCategory): number {
    return category === 'All'
      ? this.projects.length
      : this.projects.filter(p => p.category === category).length;
  }

  setCategory(category: 'All' | ProjectCategory) {
    this.activeCategory = category;
  }
}
