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
    this.date = typeof date === 'string' ? new Date(date) : date;
    this.title = title || 'Thought from day ' + this.getDate();
    this.content = content;
  }

  get dateFormatted(): string {
    return `${this.getDate()}, ${this.date
      .getHours()
      .toString()
      .padStart(2, '0')}:${this.date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  private getDate() {
    return `${this.date
      .getDate()
      .toString()
      .padStart(2, '0')}-${this.date
      .getMonth()
      .toString()
      .padStart(2, '0')}-${this.date.getFullYear()}`;
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
    return Array.from(this.entries.values()).sort(
      (a, b) => (a.date.getTime() < b.date.getTime() ? 1 : -1),
    );
  }
}
