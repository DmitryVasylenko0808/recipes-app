import { Card, pathKeys, Avatar, AvatarFallback, Typograpghy } from '@/shared';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import type { Comment } from '../model/types/comment';

type CommentItemProps = { comment: Comment; actionsSlot?: ReactNode };

export const CommentItem = ({ comment, actionsSlot }: CommentItemProps) => {
  return (
    <Card className="p-4">
      <div className="flex gap-3">
        <Link className="min-w-10" to={pathKeys.authors.byId(comment.userId)}>
          {comment.user.avatar ? (
            <Avatar size="sm" src={comment.user.avatar} alt="user avatar" />
          ) : (
            <AvatarFallback
              firstname={comment.user.firstname}
              secondname={comment.user.secondname}
            />
          )}
        </Link>
        <div className="flex-auto">
          <div className="flex min-h-10 justify-between">
            <div className="flex flex-auto items-center gap-2">
              <Link to={pathKeys.authors.byId(comment.userId)}>
                <Typograpghy tagVariant="p" className="text-foreground font-medium">
                  {comment.user.firstname} {comment.user.secondname}
                </Typograpghy>
              </Link>
              <span className="bg-muted-foreground h-0.75 w-0.75 rounded-full" />
              <Typograpghy tagVariant="span">
                {new Date(comment.createdAt).toLocaleString()}
              </Typograpghy>
              {new Date(comment.updatedAt) > new Date(comment.createdAt) && (
                <Typograpghy tagVariant="span">
                  updated: {new Date(comment.updatedAt).toLocaleString()}
                </Typograpghy>
              )}
            </div>
            <div className="flex gap-1">{actionsSlot}</div>
          </div>
          <div>
            <Typograpghy tagVariant="p">{comment.content}</Typograpghy>
          </div>
        </div>
      </div>
    </Card>
  );
};
