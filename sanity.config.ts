'use client';

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schemaTypes } from './src/sanity/schemaTypes';

const basePath = process.env.SANITY_STUDIO_BASEPATH || '/studio';

export default defineConfig({
  name: 'villa-casa-mia',
  title: 'Villa Casa Mia',
  basePath,
  projectId: projectId || 'placeholder',
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
