export type ClassDictionary = Record<string, boolean | string | number | null | undefined>
export type ClassArray = ClassValue[]
export type ClassValue =
  | string
  | number
  | ClassDictionary
  | ClassArray
  | boolean
  | null
  | undefined

function append(classes: string[], value: ClassValue): void {
  if (!value && value !== 0) return

  if (typeof value === "string" || typeof value === "number") {
    if (value !== "") classes.push(String(value))
    return
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      append(classes, entry)
    }
    return
  }

  if (typeof value === "object") {
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key) && value[key]) {
        classes.push(key)
      }
    }
  }
}

export function clsx(...values: ClassValue[]): string {
  const classes: string[] = []
  for (const value of values) {
    append(classes, value)
  }
  return classes.join(" ")
}
