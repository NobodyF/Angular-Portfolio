import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TechStackComponent } from './tech-stack.component';

describe('TechStackComponent', () => {
  let component: TechStackComponent;
  let fixture: ComponentFixture<TechStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechStackComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should lead with the core build skills', () => {
    expect(component.groups[0].label).toBe('Build');
    expect(component.groups[0].primary).toBeTrue();
    expect(component.groups[0].items).toContain('LangChain');
  });

  it('should build a network with one route per output', () => {
    expect(component.routes.map(r => r.label)).toEqual(['RAG', 'Vision', 'Agents']);
    expect(component.edges.length).toBe(4 * 6 + 6 * 6 + 6 * 3);
  });
});
