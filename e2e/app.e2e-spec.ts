import { ShopUdemyPage } from './app.po';

describe('shop-udemy App', () => {
  let page: ShopUdemyPage;

  beforeEach(() => {
    page = new ShopUdemyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
