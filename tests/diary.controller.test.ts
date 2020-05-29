import { Diary, DiaryEntry, DiaryEntrySource } from '../src/app/diary.model';
import { DiaryController } from '../src/app/diary.controller';
import { DiaryService } from '../src/app/diary.service';

let instance: DiaryController;
let diary: Diary;
const entry = new DiaryEntry({
  title: 'Title',
  content: 'Today was a good day.',
  date: new Date(),
});

const newEntry = new DiaryEntry({
  title: 'Title 2',
  content: 'Today was such a good day.',
  date: new Date(),
});

const entries: DiaryEntrySource[] = [entry];

beforeEach(() => {
  diary = new Diary(entries);
  new DiaryService().saveDiary(diary);
  instance = new DiaryController(document.body);
});

test('should render saved entries', () => {
  const renderedEntry = document.body.querySelectorAll(
    '[data-test-el="entry"]',
  );
  expect(renderedEntry.length).toBe(1);

  const entryHTML = renderedEntry[0].innerHTML;
  expect(entryHTML).toContain(entry.title);
  expect(entryHTML).toContain(entry.content);
  expect(entryHTML).toContain(entry.dateFormatted);
});

test('should add diary entry', () => {
  instance.addEmptyEntry(newEntry);

  const renderedEntry = document.body.querySelectorAll(
    '[data-test-el="entry"]',
  );
  expect(renderedEntry.length).toBe(2);
});
