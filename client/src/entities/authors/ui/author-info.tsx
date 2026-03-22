import { Card, Acronym, Typograpghy } from '@/shared';
import type { Author } from '../model/types/author';

type AuthorInfoProps = { author: Author };

export const AuthorInfo = ({ author }: AuthorInfoProps) => {
  return (
    <Card>
      <div className="flex gap-6 p-8">
        {author.avatar ? (
          <img className="h-32 w-32 rounded-full" src={author.avatar} alt="author avatar" />
        ) : (
          <Acronym
            firstname={author.firstname}
            secondname={author.secondname}
            className="h-32 w-32 text-4xl"
          />
        )}
        <div className="flex-auto">
          <div className="flex items-center justify-between">
            <Typograpghy tagVariant="h2">
              {author.firstname} {author.secondname}
            </Typograpghy>
          </div>
          <Typograpghy tagVariant="p">{author.bio}</Typograpghy>
        </div>
      </div>
    </Card>
  );
};
