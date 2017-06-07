import { WhereuatngPage } from './app.po';

describe('whereuatng App', () => {
  let page: WhereuatngPage;

  beforeEach(() => {
    page = new WhereuatngPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
