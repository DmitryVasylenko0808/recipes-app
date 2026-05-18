import type { AuthorPreview } from '@/entities/authors/model/types/author-preview';
import { pathKeys, Avatar, AvatarFallback, Typograpghy } from '@/shared';
import { Link } from 'react-router';

type RecipeAuthorProps = { author: AuthorPreview };

export const RecipeAuthor = ({ author }: RecipeAuthorProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 pb-6">
        <Link to={pathKeys.authors.byId(author.id)}>
          {author.avatar ? (
            <Avatar size="md" src={author.avatar} alt="author avatar" />
          ) : (
            <AvatarFallback
              firstname={author.firstname}
              secondname={author.secondname}
              className="h-14 w-14"
            />
          )}
        </Link>
        <div className="flex flex-col gap-0.5">
          <Typograpghy tagVariant="span" className="text-sm">
            Recipe by
          </Typograpghy>
          <Link
            to={pathKeys.authors.byId(author.id)}
            className="text-foreground hover:text-primary font-medium duration-100"
          >
            {author.firstname} {author.secondname}
          </Link>
        </div>
      </div>
      <div className="bg-ring/30 h-px" />
    </div>
  );
};
