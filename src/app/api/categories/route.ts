// import prisma from "@/lib/prisma";
// import { NextResponse, NextRequest } from "next/server";

// export const GET = async (req: NextRequest) => {
//   try {
//     const categories = await prisma.category.findMany({
//       select: {
//         id: true,
//         name: true,
//         // posts: {
//         //   select: {
//         //     id: true,
//         //   },
//         // },
//         // _count: {
//         //   select: {
//         //     posts: true,
//         //   },
//         // },
//         posts: {
//           select: {
//             post: {
//               select: {
//                 id: true,
//                 title: true,
//               },
//             },
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//     return NextResponse.json(categories);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "カテゴリの取得に失敗しました" },
//       { status: 500 } // 500: Internal Server Error
//     );
//   }
// };

import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// [GET] /api/categories カテゴリ一覧の取得
export const GET = async (req: NextRequest) => {
  console.log("GET /api/categories");
  try {
    // const categories = await prisma.category.findMany({
    //   select: {
    //     id: true,
    //     name: true,
    //     _count: {
    //       select: {
    //         posts: true,
    //       },
    //     },
    //   },
    //   orderBy: {
    //     createdAt: "desc",
    //   },
    // });
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc", // 降順 (新しい順)
      },
    });
    // return NextResponse.json({
    //   isSuccess: true,
    //   contents: categories,
    // });
    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "カテゴリの取得に失敗しました" },
      { status: 500 } // 500: Internal Server Error
    );
  }
};
