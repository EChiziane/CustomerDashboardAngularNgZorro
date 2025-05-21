import { Component, OnInit } from '@angular/core';
import { Sprint } from '../models/sprint';
import { SprintService } from '../services/sprint.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
  standalone: false
})
export class SprintComponent implements OnInit {

  listOfDisplayData: Sprint[] = [];
  totalSprints = 0;

  isSprintDrawerVisible = false;
  searchValue = '';

  sprintForm!: FormGroup;

  constructor(private sprintService: SprintService, private fb: FormBuilder) {
    this.initForms();
  }

  ngOnInit(): void {
    this.loadSprints();
  }

  private loadSprints(): void {
    this.sprintService.getSprints().subscribe(sprints => {
      this.listOfDisplayData = sprints;
      this.totalSprints = sprints.length;
    });
  }

  openSprintDrawer(): void {
    this.isSprintDrawerVisible = true;
  }

  closeSprintDrawer(): void {
    this.isSprintDrawerVisible = false;
    this.sprintForm.reset();
  }

  submitSprint(): void {
    if (this.sprintForm.valid) {
      this.sprintService.addSprint(this.sprintForm.value).subscribe(() => {
        this.loadSprints();
        this.closeSprintDrawer();
      });
    }
  }

  deleteSprint(sprint: Sprint): void {
    if (sprint.id) {
      this.sprintService.deleteSprint(sprint.id).subscribe(() => {
        this.loadSprints();
      });
    }
  }

  search(): void {
    // Aqui podes implementar filtro local, ou chamar API com filtro
    const val = this.searchValue.toLowerCase();
    if (!val) {
      this.loadSprints();
      return;
    }
    this.listOfDisplayData = this.listOfDisplayData.filter(sprint =>
      sprint.code.toLowerCase().includes(val) ||
      sprint.descricao.toLowerCase().includes(val)
    );
  }

  private initForms(): void {
    this.sprintForm = this.fb.group({
      code: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }
}
