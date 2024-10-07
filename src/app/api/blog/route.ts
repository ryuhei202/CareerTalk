import { prisma } from "@/lib/prisma";


// ブログの全記事取得API
export const GET = async () => {
  try {
    const posts = await prisma.post.findMany()
    return Response.json({ message: "Success", posts }, { status: 200 })
  } catch (error) {
    return Response.json({ message: "Error", error }, { status: 500 })
  }
}

export const POST = async (req: Request,) => {
  try {
    const body = await req.json()
    console.log(body);

    const { title, description } = body
    const post = await prisma.post.create({
      data: { title, description }
    })
    return Response.json({ message: "Success", post }, { status: 201 })
  } catch (error) {
    return Response.json({ message: "Error", error }, { status: 500 })
  }
}
