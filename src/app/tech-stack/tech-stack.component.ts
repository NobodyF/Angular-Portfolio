import { Component } from '@angular/core';

interface StackGroup {
  label: string;
  items: string[];
}

@Component({
  selector: 'app-tech-stack',
  templateUrl: './tech-stack.component.html',
  styleUrls: ['./tech-stack.component.css']
})
export class TechStackComponent {
  groups: StackGroup[] = [
    {
      label: 'AI / ML',
      items: ['Python', 'PyTorch', 'LangChain', 'FastAPI', 'Azure OpenAI', 'YOLO', 'RAG', 'LLM Agents']
    },
    {
      label: 'Cloud & DevOps',
      items: ['Azure Container Apps', 'Azure DevOps', 'GitHub Actions', 'Docker']
    },
    {
      label: 'Web',
      items: ['Angular', 'TypeScript', 'JavaScript', 'Django', 'C#']
    },
    {
      label: 'Web3 (past work)',
      items: ['Solidity', 'Ethereum', 'Hardhat', 'OpenZeppelin']
    }
  ];
}
