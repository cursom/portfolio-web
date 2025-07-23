"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { Settings } from "lucide-react"
import { Switch } from "@/components/switch"

interface CfgProps {
    open: boolean
    onOpenChange: (v: boolean) => void
    particlesEnabled: boolean
    onParticlesToggle: (v: boolean) => void
}

export function Cfg({ open, onOpenChange, particlesEnabled, onParticlesToggle }: CfgProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
                <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-xl border border-gray-300 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title>
                            <div className="flex items-center space-x-2">
                                <Settings className="w-5 h-5 text-purple-500" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h3>
                            </div>
                        </Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"><X className="w-5 h-5" /></button>
                        </Dialog.Close>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
                                    <span className="text-white text-xs font-bold">i</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Performance Notice</p>
                                    <p className="text-sm text-blue-700 dark:text-blue-200 leading-relaxed">The animated particles create a beautiful effect but may cause lag on older devices or browsers. You can disable them for better performance.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700 dark:text-gray-300">Enable particles</span>
                            <Switch checked={particlesEnabled} onCheckedChange={onParticlesToggle}/>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}