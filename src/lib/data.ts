import { client } from '@/sanity/client';
import {
  allRoomsQuery,
  roomBySlugQuery,
  allPostsQuery,
  postBySlugQuery,
  yogaStudioQuery,
  siteSettingsQuery,
} from '@/sanity/queries';
import type { Room, Post, YogaStudio, SiteSettings } from './types';

// ─── Rooms ───

export async function getRooms(): Promise<Room[]> {
  return client.fetch<Room[]>(allRoomsQuery, {}, { next: { tags: ['room'] } });
}

export async function getRoom(slug: string): Promise<Room | null> {
  return client.fetch<Room | null>(roomBySlugQuery, { slug }, { next: { tags: ['room'] } });
}

export async function getRoomSlugs(): Promise<string[]> {
  const rooms = await getRooms();
  return rooms.map((r) => r.slug.current);
}

// ─── Blog ───

export async function getPosts(): Promise<Post[]> {
  return client.fetch<Post[]>(allPostsQuery, {}, { next: { tags: ['post'] } });
}

export async function getPost(slug: string): Promise<Post | null> {
  return client.fetch<Post | null>(postBySlugQuery, { slug }, { next: { tags: ['post'] } });
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await getPosts();
  return posts.map((p) => p.slug.current);
}

export async function getRelatedPosts(currentSlug: string, limit = 3): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((p) => p.slug.current !== currentSlug).slice(0, limit);
}

// ─── Yoga ───

export async function getYogaStudio(): Promise<YogaStudio | null> {
  return client.fetch<YogaStudio | null>(yogaStudioQuery, {}, { next: { tags: ['yogaStudio'] } });
}

// ─── Site Settings ───

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch<SiteSettings | null>(siteSettingsQuery, {}, { next: { tags: ['siteSettings'] } });
}
