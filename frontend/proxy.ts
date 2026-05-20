
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authClient } from "./lib/auth-client";

export async function proxy(request: NextRequest) {
    const {data,error} = await authClient.getSession(
        {
            fetchOptions:{
                headers: await headers()
            }
        }
    )
   
            const isHomePage = request.nextUrl.pathname === "/"

        if(!data) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }


            // if user is loggedin and try to access homepage then redirect to chat page otherwise allow to access the page
          if (data && isHomePage) {
        return NextResponse.redirect(new URL("/chat", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [ "/chat/:path*"], // Specify the routes the middleware applies to
};