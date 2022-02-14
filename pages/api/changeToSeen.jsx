import { GraphQLClient } from "graphql-request";

export default async ({ body }, res) => {
    const graphcms = new GraphQLClient(process.env.API_URL, {
        headers: { "Authorization" : process.env.ACCESS_TOKEN},
    })

    await graphcms.request(
        `
        mutation($slug: String!) {
            updateVideo(where: 
              { slug: $slug},
            data:{ seen: true}
            ) {
              id,
              title,
              seen
            }
          }
        `,
        { slug: body.slug }
    )

    await graphcms.request(
        `
        mutation publishVideo($slug: String) {
            publishVideo (where: { slug: $slug }, to:PUBLISHED) {
                slug
            }
        }
        `,
        { slug: body.slug }
    )
    res.status(201).json({ slug: body.slug })
}