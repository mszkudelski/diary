import { Diary, DiaryEntrySource } from '../src/app/diary.model';
import { DiaryService } from '../src/app/diary.service';

let instance: DiaryService;
let diary: Diary;
const entry = {
  title: 'Title',
  content: 'Today was a good day.',
  date: new Date(),
};

const entries: DiaryEntrySource[] = [entry];

beforeEach(() => {
  diary = new Diary(entries);
  instance = new DiaryService();
});

test('should get empty diary', () => {
  const diaryReturned = instance.getDiary();
  expect(diaryReturned instanceof Diary).toBeTruthy();
  expect(diaryReturned.getEntries().length).toBe(0);
});

test('should save diary', () => {
  instance.saveDiary(diary);

  const diaryReturned = instance.getDiary();
  expect(diaryReturned.getEntries().length).toBe(1);
  expect(diaryReturned.getEntries()[0].title).toBe(entry.title);
});
