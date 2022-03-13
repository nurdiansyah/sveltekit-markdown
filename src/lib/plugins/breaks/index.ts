import type { BytemdPlugin } from '$lib'
import remarkBreaks from 'remark-breaks'

export default function breaks(): BytemdPlugin {
  return {
    remark: (u) => u.use(remarkBreaks),
  }
}
