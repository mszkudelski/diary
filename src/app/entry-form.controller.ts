import { DiaryService } from './diary.service';
import { Diary, DiaryEntry } from './diary.model';

export class EntryFormController {
  private newEntryListeners: ((entry: DiaryEntry) => void)[] = [];

  constructor(private container: HTMLElement) {
    this.renderForm();
  }
  renderForm() {
    this.container.innerHTML = `
      <form class="form" action="#">
            <textarea class="form__text" name="content" placeholder="What's in your head?" id="" cols="30" rows="10"></textarea>
            <input class="form__title" type="text" name="title" placeholder="Title">
            <button type="submit" class="form__button">Save</button>
            <button type="reset" class="form__button">Cancel</button>
      </form>
    `;

    const contentInput = this.container.querySelector<HTMLTextAreaElement>(
      '[name="content"]',
    );

    const titleInput = this.container.querySelector<HTMLInputElement>(
      '[name="title"]',
    );

    this.container
      .querySelector('button[type="submit"]')
      .addEventListener('click', (event: Event) => {
        event.preventDefault();
        this.newEntryListeners.forEach((listener) =>
          listener(
            new DiaryEntry({
              title: titleInput.value,
              content: contentInput.value,
              date: new Date(),
            }),
          ),
        );
      });
  }

  registerNewEntryListener(callback: (entry: DiaryEntry) => void) {
    this.newEntryListeners.push(callback);
  }
}
