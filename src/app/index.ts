import '../assets/index.scss';
import { DiaryController } from './diary.controller';
import { EntryFormController } from './entry-form.controller';

const diaryController = new DiaryController(document.querySelector('#entries'));
new EntryFormController(
  document.querySelector('#form'),
).registerNewEntryListener(diaryController.addEmptyEntry.bind(diaryController));
