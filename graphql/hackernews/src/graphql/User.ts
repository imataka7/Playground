import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('name');
    t.nonNull.string('email');
    t.nonNull.string('password');
    t.nonNull.list.nonNull.field('links', {
      type: 'Link',
      resolve(parent, args, context, info) {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .links();
      }
    });
    t.nonNull.list.nonNull.field('votes', {
      type: 'Link',
      resolve(parent, args, context, info) {
        return context.prisma.user
          .findUnique({
            where: { id: parent.id }
          })
          .votes();
      }
    });
  }
});