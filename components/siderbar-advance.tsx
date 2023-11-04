'use client'

import { useCookies } from 'react-cookie'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/customize/sheet'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'

export function AdvanceSheet() {
  const [cookies, setCookie] = useCookies([
    'temperature',
    'size',
    'overlap',
    'open-api-key',
    'context'
  ])

  function handleSetCookie(
    key: 'temperature' | 'size' | 'overlap' | 'open-api-key' | 'context',
    value: any
  ) {
    setCookie(key, value, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24) // expires in 1 day
    })
  }
  function handleReset() {
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24)
    setCookie('temperature', 80, {
      expires
    })
    setCookie('size', 100, {
      expires
    })
    setCookie('overlap', 100, {
      expires
    })
    setCookie('open-api-key', '', {
      expires
    })
    setCookie('context', '', {
      expires
    })
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Tùy chỉnh</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Tùy chỉnh nâng cao</SheetTitle>
          <SheetDescription>Tùy chỉnh nâng cao cho trợ lý ảo</SheetDescription>
        </SheetHeader>
        <div className="grid w-full gap-4 py-4 sm:grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Thiết lập đầu vào</CardTitle>
            </CardHeader>
            <CardContent className="grid w-full gap-4 py-4">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="open-api-key">Open API Key</Label>
                <Input
                  defaultValue={cookies?.['open-api-key']}
                  id="open-api-key"
                  type="text"
                  onBlur={e => handleSetCookie('open-api-key', e.target.value)}
                  placeholder="(Nếu có)"
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="context">Đầu vào</Label>
                <Textarea
                  defaultValue={cookies?.context || ''}
                  placeholder="Nhập dữ liệu đầu vào"
                  id="context"
                  onBlur={e => handleSetCookie('context', e.target.value)}
                  rows={10}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Thiết lập đầu ra</CardTitle>
            </CardHeader>
            <CardContent className="grid w-full gap-4 py-4">
              <div>
                <Label>Độ chính xác</Label>
                <div className="flex">
                  <Slider
                    defaultValue={[cookies?.temperature || 80]}
                    max={100}
                    step={1}
                    className="w-[calc(90%)]"
                    onValueChange={(e: Array<number>) =>
                      handleSetCookie('temperature', e[0] || 0)
                    }
                  />
                  <Input
                    className="mx-1 w-[calc(15%)] text-end"
                    value={`${cookies?.temperature}%`}
                    type="text"
                    disabled
                  />
                </div>
              </div>
              <div>
                <Label>Kích thước đoạn</Label>
                <div className="flex">
                  <Slider
                    defaultValue={[cookies?.size || 100]}
                    max={3000}
                    step={1}
                    className="w-[calc(90%)]"
                    onValueChange={(e: Array<number>) =>
                      handleSetCookie('size', e[0] || 0)
                    }
                  />
                  <Input
                    className="mx-1 w-[calc(15%)] text-end"
                    value={`${cookies?.size}/3000`}
                    type="text"
                    disabled
                  />
                </div>
              </div>
              <Label>Chồng chất đoạn</Label>
              <div className="flex">
                <Slider
                  defaultValue={[cookies?.overlap || 100]}
                  max={600}
                  step={1}
                  className="w-[calc(90%)]"
                  onValueChange={(e: Array<number>) =>
                    handleSetCookie('overlap', e[0] || 0)
                  }
                />
                <Input
                  className="mx-1 w-[calc(15%)] text-end"
                  value={`${cookies?.overlap}/600`}
                  type="text"
                  disabled
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <SheetFooter>
          <SheetClose>
            <Button variant="destructive" onClick={handleReset}>
              Mặc định
            </Button>
          </SheetClose>
          <SheetClose>
            <Button>Lưu</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
