import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@/components/ui/icons'

import { UseChatHelpers } from 'ai/react'

const exampleMessages = [
  {
    heading: 'Biến động thị trường chứng khoáng Việt Nam hôm qua',
    message: `Các biến động của thị trường chứng khoáng Việt Nam hôm qua tác động như thế nào?`
  },
  {
    heading: 'Tóm tắt sự kiện chứng khoán',
    message: 'Tóm tắt các sự kiện, tin túc liên quan đến chứng khoán'
  },
  {
    heading: 'Các cổ phiếu tăng giá mạnh nhất',
    message: `Danh sách các cổ phiếu tăng giá mạnh nhất hôm nay`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">
          Chào mừng bạn đến với trợ lý ảo hỗ trợ chứng khoán của Xlancer
        </h1>

        <p className="leading-normal text-muted-foreground">
          Hãy để tôi giúp bạn tìm kiếm thông tin về chứng khoán một cách nhanh
          chóng và hiệu quả nhất. Bạn có thể thử một số câu hỏi mẫu dưới đây
          hoặc tự đặt câu hỏi cho tôi.
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
