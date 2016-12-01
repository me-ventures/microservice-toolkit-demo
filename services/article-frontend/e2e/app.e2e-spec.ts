import { ArticleFrontendPage } from './app.po';

describe('article-frontend App', function() {
  let page: ArticleFrontendPage;

  beforeEach(() => {
    page = new ArticleFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
