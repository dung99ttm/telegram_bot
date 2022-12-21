const { Telegraf, Input } = require('telegraf');
const { message } = require('telegraf/filters');
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN);
const USER_ID = {
  LONG: "5186919276",
  THONG: "1421003795",
  PHONG: "1471909653",
  DUNG: "1471909653"
}
const getUserName = async (ctx, userId) => {
  try {
    return (await ctx.getChatMember(userId))?.user?.username;
  } catch (error) {
    return "#member"
  }
}

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply());

bot.command('music', async (ctx) => {
  let userId = ctx.message.from?.id?.toString();
  switch (userId) {
    case USER_ID.PHONG:
      await ctx.reply(`@${await getUserName(ctx, USER_ID.THONG)} @${await getUserName(ctx, USER_ID.LONG)} @${await getUserName(ctx, USER_ID.DUNG)} xin một bản nhạc nào`);
      break;
    case USER_ID.DUNG:
      await ctx.reply(`@${await getUserName(ctx, USER_ID.THONG)} @${await getUserName(ctx, USER_ID.PHONG)} @${await getUserName(ctx, USER_ID.LONG)} xin một bản nhạc nào`);
      break;
    case USER_ID.THONG:
      await ctx.reply(`@${await getUserName(ctx, USER_ID.DUNG)} @${await getUserName(ctx, USER_ID.PHONG)} @${await getUserName(ctx, USER_ID.LONG)} xin một bản nhạc nào`);
      break;
    case USER_ID.LONG:
      await ctx.reply(`@${await getUserName(ctx, USER_ID.DUNG)} @${await getUserName(ctx, USER_ID.PHONG)} @${await getUserName(ctx, USER_ID.THONG)} xin một bản nhạc nào`);
      break;
    default:
      await ctx.reply("Who the fuck are you?");
      break;
  }
});

bot.command('bruce', async (ctx) => {
  await ctx.replyWithPhoto(Input.fromURL("https://scontent.fhan14-1.fna.fbcdn.net/v/t1.18169-9/1982064_301028530058023_6464268228576422604_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=zGD77QRlPhoAX_mmnZ1&_nc_ht=scontent.fhan14-1.fna&oh=00_AfAQnX5eqF7IVCVKrbLV83ZyEvBuBnNq2A1m8_8KC0Y-eQ&oe=63CA31A4"))
})

bot.on(message('text'), async (ctx) => {
  if (ctx.message.from?.id == USER_ID.LONG && (ctx.message?.text?.toLowerCase()?.includes("emi"))) {
    await ctx.reply(`@${ctx.from.username} nhắc ít thôi`);
  }
});

bot.catch((error) => {
  console.log(error);
})

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
