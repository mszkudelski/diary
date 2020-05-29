import { DiaryService } from './diary.service';
import { Diary, DiaryEntry } from './diary.model';

export class DiaryController {
  private diaryService: DiaryService = new DiaryService();
  private diary: Diary = this.diaryService.getDiary();

  constructor(private container: HTMLElement) {
    this.renderDiary();
  }

  private renderDiary() {
    this.container.innerHTML = this.diary
      .getEntries()
      .reduce((result, entry) => result + this.getEntryTemplate(entry), '');
  }

  private getEntryTemplate(entry: DiaryEntry): string {
    return `
          <article class="entry" data-test-el="entry">
            <h2 class="entry__title">${entry.title}</h2>
            <h3 class="entry__subtitle">${entry.dateFormatted}</h3>
            <div class="entry__content">${entry.content}</div>
          </article>  
        `;
  }

  addEmptyEntry(entry: DiaryEntry) {
    this.diary.addEntry(entry);
    this.diaryService.saveDiary(this.diary);
    this.container.innerHTML =
      this.getEntryTemplate(entry) + this.container.innerHTML;
  }
}
