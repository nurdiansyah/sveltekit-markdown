import type { BytemdPlugin } from '$lib'
import remarkGemoji from 'remark-gemoji'

export default function gemoji(): BytemdPlugin {
  return {
    remark: (u) => u.use(remarkGemoji),
  }
}
