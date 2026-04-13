import { TabItem, Tabs, useAuth } from '@/shared';
import { ChefHat, Heart } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useParams } from 'react-router';
import { AuthorRecipes } from './author-recipes';
import { FavoriteRecipes } from './favorite-recipes';

type ProfileTabs = 'author' | 'favorites';

export const ProfileRecipes = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [tab, setTab] = useState<ProfileTabs>('author');

  const handleClickTab = (tab: ProfileTabs) => setTab(tab);

  const tabContent: Record<ProfileTabs, ReactNode> = {
    author: <AuthorRecipes />,
    favorites: <FavoriteRecipes />,
  };

  const isOwn = currentUser?.id === id;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Tabs className="mb-4">
        <TabItem
          text="Author recipes"
          icon={ChefHat}
          active={tab === 'author'}
          onClick={() => handleClickTab('author')}
        />
        {isOwn && (
          <TabItem
            text="Favorite recipes"
            icon={Heart}
            active={tab === 'favorites'}
            onClick={() => handleClickTab('favorites')}
          />
        )}
      </Tabs>
      {tabContent[tab]}
    </div>
  );
};
