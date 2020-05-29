export interface DiaryEntrySource {
  readonly title: string;
  readonly date: Date | string;
  readonly content: string;
}

export class DiaryEntry implements DiaryEntrySource {
  readonly title: string;
  readonly date: Date;
  readonly content: string;
  constructor({ title, date, content }: DiaryEntrySource) {
    this.title = title;
    this.date = typeof date === 'string' ? new Date(date) : date;
    this.content = content;
  }

  get dateFormatted(): string {
    return `${this.date.getDate()}-${this.date.getMonth()}-${this.date.getFullYear()}, ${this.date.getHours()}:${this.date.getMinutes()}`;
  }
}

export class Diary {
  private entries: Map<string, DiaryEntry> = new Map();

  constructor(entries: DiaryEntrySource[]) {
    entries.forEach((entry) => {
      this.addEntry(entry);
    });
  }

  addEntry(entry: DiaryEntrySource): DiaryEntry {
    if (this.entries.has(entry.title)) {
      throw new Error('DIARY_ALREADY_HAS_ENTRY_WITH_SUCH_TITLE');
    }
    const entryInstance = new DiaryEntry(entry);
    this.entries.set(entry.title, new DiaryEntry(entry));
    return entryInstance;
  }

  getEntries() {
    return Array.from(this.entries.values());
  }
}
