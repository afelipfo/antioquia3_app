import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const VALID_USER = {
  username: "angela",
  password: "angela123",
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (username === VALID_USER.username && password === VALID_USER.password) {
      const cookieStore = await cookies()
      cookieStore.set("session", "angela", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}
