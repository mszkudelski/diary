import { CookiesService } from './helpers/cookies.service';
import { Diary } from './diary.model';

export class DiaryService {
  private static readonly cookiePrefix = '__DIARY__';
  private cookiesService: CookiesService = new CookiesService();

  saveDiary(diary: Diary) {
    for (const entry of diary.getEntries()) {
      this.cookiesService.set({
        name: DiaryService.cookiePrefix + entry.title,
        value: JSON.stringify(entry),
      });
    }
  }

  getDiary() {
    const diaryEntries = this.cookiesService
      .get(DiaryService.cookiePrefix, true)
      .map((cookie) => JSON.parse(cookie));
    return new Diary(diaryEntries);
  }
}
