const showdown  = require('showdown');
const converter = new showdown.Converter();

// html      = converter.makeHtml(text);

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {

    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.site.search(ctx.query);
    } else {
      entities = await strapi.services.site.find(ctx.query);
    }
    const paragraphs = entities.flatMap(entity => entity.pages).flatMap(page => page.sections).flatMap(section => section.paragraphs);

    paragraphs.forEach(p => {
  		p.content = converter.makeHtml(p.content);
  	})

    return entities;
  },
};