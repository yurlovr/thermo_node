module.exports.test = async function test(ctx, next) {
    ctx.body = {data: ctx.request.body};
};