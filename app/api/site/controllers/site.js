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

    for(const site of entities){
      site.pages = await strapi.query('page').find({site:site.id}).map(page => page.uri);
    }

    const paragraphs = entities.flatMap(entity => entity.pages).flatMap(page => page.sections).flatMap(section => section.paragraphs);

    paragraphs.forEach(p => {
      p.content = strapi.config.functions.converter(p.content);
  	})

    return entities;
  },
};