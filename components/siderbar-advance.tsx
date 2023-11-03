'use client'

import { useState } from 'react'

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
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'

export function AdvanceSheet() {
  const [temper, setTemper] = useState<number>(30)
  const [size, setSize] = useState<number>(100)
  const [overlap, setOverlap] = useState<number>(100)
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet key="top">
        <SheetTrigger asChild>
          <Button variant="outline">Tùy chỉnh</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Tùy chỉnh nâng cao</SheetTitle>
            <SheetDescription>
              Tùy chỉnh nâng cao cho trợ lý ảo
            </SheetDescription>
          </SheetHeader>
          <div className="w-full">
            <div className="grid gap-4 py-4">
              <div>
                <Label>Độ chính xác</Label>
                <Slider
                  defaultValue={[30]}
                  max={100}
                  step={1}
                  className="w-full"
                  onValueChange={(e: Array<number>) => setTemper(e[0] || 0)}
                />
              </div>
              <div>
                <Label>Kích thước đoạn</Label>
                <Slider
                  defaultValue={[100]}
                  max={3000}
                  step={1}
                  className="w-full"
                  onValueChange={(e: Array<number>) => setSize(e[0] || 0)}
                />
              </div>
              <div>
                <Label>Chồng chất đoạn</Label>
                <Slider
                  defaultValue={[50]}
                  max={600}
                  step={1}
                  className="w-full"
                  onValueChange={(e: Array<number>) => setOverlap(e[0] || 0)}
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Đầu vào</Label>
                <Textarea
                  placeholder="Nhập dữ liệu đầu vào"
                  id="message"
                  rows={10}
                />
              </div>
            </div>
          </div>
          {/* <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div> */}
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Cập nhât</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
