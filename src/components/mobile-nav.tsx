"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";

interface MobileNavProps {
    dict: any;
}

export function MobileNav({ dict }: MobileNavProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="px-6 text-left flex items-center gap-2">
                    <SheetTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/spleasy-icon.svg" alt="Spleasy Logo" className="w-full h-full" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Spleasy</span>
                    </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-6">
                    <div className="flex flex-col gap-3">
                        <SheetClose asChild>
                            <Link
                                href="#features"
                                className="text-lg font-medium hover:text-primary transition-colors flex items-center gap-2"
                            >
                                {dict.navigation.features}
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link
                                href="#"
                                className="text-lg font-medium hover:text-primary transition-colors"
                            >
                                {dict.navigation.howItWorks}
                            </Link>
                        </SheetClose>
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{dict.navigation.language}</span>
                            <LanguageSwitcher />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{dict.navigation.theme}</span>
                            <ModeToggle />
                        </div>
                        <SheetClose asChild>
                            <Link
                                href="/join"
                                className="text-lg font-medium hover:text-primary transition-colors"
                            >
                                {dict.navigation.joinGroup}
                            </Link>
                        </SheetClose>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
