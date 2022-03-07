import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware (req: NextRequest, ev: NextFetchEvent) {
  const { cookies } = req
  if (cookies.token !== undefined) return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + "/login")
  return NextResponse.next()
}