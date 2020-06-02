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
            <textarea class="form__text" name="content" placeholder="What's in your head?" id="" cols="30" rows="5"></textarea>
            <p class="form__error" id="error"></p>
            <div class="form__row">
              <input class="form__title" type="text" name="title" placeholder="Title">
              <button type="submit" class="form__button">Save</button>
              <button type="reset" class="form__button">Cancel</button>
            </div>
      </form>
    `;

    const contentInput = this.container.querySelector<HTMLTextAreaElement>(
      '[name="content"]',
    );

    const titleInput = this.container.querySelector<HTMLInputElement>(
      '[name="title"]',
    );

    const errorElement = this.container.querySelector<HTMLElement>('#error');

    this.container
      .querySelector('button[type="submit"]')
      .addEventListener('click', (event: Event) => {
        event.preventDefault();
        const executionSuccess = this.newEntryListeners.map((listener) => {
          try {
            listener(
              new DiaryEntry({
                title: titleInput.value,
                content: contentInput.value,
                date: new Date(),
              }),
            );
            return true;
          } catch (error) {
            if (error.message === 'DIARY_ALREADY_HAS_ENTRY_WITH_SUCH_TITLE') {
              errorElement.innerHTML = 'Entry with such title already exists';
            }
          }
        });
        if (executionSuccess.every(Boolean)) {
          errorElement.innerHTML = '';
          contentInput.value = '';
          titleInput.value = '';
        }
      });
  }

  registerNewEntryListener(callback: (entry: DiaryEntry) => void) {
    this.newEntryListeners.push(callback);
  }
}
