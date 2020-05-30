import { Diary, DiaryEntrySource } from '../src/app/diary.model';

let instance: Diary;
const entry = {
  title: 'Title',
  content: 'Today was a good day.',
  date: new Date(),
};

const entries: DiaryEntrySource[] = [entry];

beforeEach(() => {
  instance = new Diary(entries);
});

test('should set entries on instance init', () => {
  expect(instance.getEntries().length).toBe(entries.length);
});

test('should add new entry', () => {
  instance.addEntry({
    title: 'New entry',
    content: 'My day was cool',
    date: new Date(),
  });
  expect(instance.getEntries().length).toBe(entries.length + 1);
});

test('should enforce to pass unique entry title', () => {
  expect(() => instance.addEntry(entry)).toThrow(Error);
  expect(instance.getEntries().length).toBe(entries.length);
});

test('should return entries sorted descending by date', async () => {
  instance.addEntry({
    title: 'New entry',
    content: 'My day was cool',
    date: new Date(),
  });
  await new Promise((r) => setTimeout(r, 10));
  instance.addEntry({
    title: 'New entry 2',
    content: 'My day was cool',
    date: new Date(),
  });
  await new Promise((r) => setTimeout(r, 10));

  instance.addEntry({
    title: 'New entry 3',
    content: 'My day was cool',
    date: new Date(),
  });
  await new Promise((r) => setTimeout(r, 10));

  const returnedEntries = instance.getEntries();
  expect(returnedEntries[0].date.getTime()).toBeGreaterThan(
    returnedEntries[1].date.getTime(),
  );
});
