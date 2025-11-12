import { clsx, type ClassValue } from "./clsx"

type VariantRecord = Record<string, ClassValue>

type VariantDefinitions = Record<string, VariantRecord>

type VariantSelection<V extends VariantDefinitions> = {
  [K in keyof V]?: keyof V[K] | null
}

type ClassProp = {
  class?: ClassValue
  className?: ClassValue
}

type CompoundVariant<V extends VariantDefinitions> = VariantSelection<V> &
  ClassProp & {
    class?: ClassValue
  }

type CVAConfig<V extends VariantDefinitions> = {
  variants?: V
  defaultVariants?: VariantSelection<V>
  compoundVariants?: CompoundVariant<V>[]
}

type VariantRuntimeProps<V extends VariantDefinitions> = VariantSelection<V> & ClassProp

export type VariantProps<T extends (...args: any[]) => any> = T extends (
  props?: infer P
) => any
  ? Omit<NonNullable<P>, "class" | "className">
  : never

export function cva<V extends VariantDefinitions>(
  base?: ClassValue,
  config?: CVAConfig<V>,
) {
  const variants = config?.variants ?? ({} as V)
  const defaultVariants = config?.defaultVariants ?? {}
  const compoundVariants = config?.compoundVariants ?? []

  return (props?: VariantRuntimeProps<V>) => {
    const input = props ?? {}
    const classes: ClassValue[] = []

    if (base) classes.push(base)

    for (const variantName of Object.keys(variants) as Array<keyof V>) {
      const variantConfig = variants[variantName]
      const selected =
        input[variantName] ?? defaultVariants[variantName]
      if (selected == null) continue
      const value = variantConfig[selected as keyof typeof variantConfig]
      if (value) classes.push(value)
    }

    for (const compound of compoundVariants) {
      const matches = (Object.keys(variants) as Array<keyof V>).every((name) => {
        if (!(name in compound)) return true
        const expected = compound[name]
        const value = input[name] ?? defaultVariants[name]
        if (Array.isArray(expected)) {
          return expected.includes(value as any)
        }
        return expected === value
      })

      if (matches && (compound.class || compound.className)) {
        classes.push(compound.class, compound.className)
      }
    }

    if (input.class) classes.push(input.class)
    if (input.className) classes.push(input.className)

    return clsx(classes)
  }
}
