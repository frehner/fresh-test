/** @jsx h */
import { h } from "preact";
// doesn't work, sadly. But in an ideal world, it would. See https://github.com/microsoft/TypeScript/issues/50629 for more info
// @deno-types="https://unpkg.com/@shopify/hydrogen-ui-alpha@2022.7.2/dist/types/index.d.ts"
//
import { Image } from "@shopify/hydrogen-ui-alpha";
import { Handlers, PageProps } from "$fresh/server.ts";

const query = `
  {
    shop {
      name
    }
    products(first: 1) {
      nodes {
        id
        title
        publishedAt
        handle
        variants(first: 1) {
          nodes {
            id
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`;

export const handler: Handlers = {
  async GET(_, ctx) {
    const req = await fetch(
      `https://hydrogen-preview.myshopify.com/api/2022-07/graphql.json`,
      {
        method: "POST",
        body: query,
        headers: {
          "X-Shopify-Storefront-Access-Token":
            "3b580e70970c4528da70c98e097c2fa0",
          "content-type": "application/graphql",
        },
      },
    );

    const reqJson = await req.json();
    // console.log(reqJson);

    return ctx.render(reqJson);
  },
};

export default function Home({ data }: PageProps) {
  const imageData = data.data.products.nodes[0].variants.nodes[0].image;
  return (
    <div>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p>
        Welcome to some "fresh" Hydrogen components.
      </p>
      <Image data={imageData} width={500} widths={[500]} />
    </div>
  );
}
