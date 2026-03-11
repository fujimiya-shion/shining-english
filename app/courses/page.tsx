"use client";

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/shared/components/ui/button'
import { AppButton } from '@/shared/components/ui/app-button'
import { AppCheckBox } from '@/shared/components/ui/app-checkbox'
import { Input } from '@/shared/components/ui/input'
import { CourseCardItem } from '@/shared/components/ui/course/course-card-item'
import { Search } from 'lucide-react'
import { Card, CardContent } from '@/shared/components/ui/card'
import { useCourseStore } from './stores/course/course.store'
import { useCourseFilterStore } from './stores/course/course-filter.store'
import { useEffect, useMemo, useState } from 'react';
import { AppStatus } from '@/shared/enums/app-status';
import { Toaster, toast } from 'react-hot-toast';
import { AppUtils } from '@/shared/utils/app-utils';
import { CourseFilterRequest } from '@/data/dtos/course.dto';

const durationFilters = ['< 4 tuần', '4-8 tuần', '> 8 tuần'];

function formatPricePlaceholder(value: number | null | undefined, fallback: string): string {
    if (value === null || value === undefined) {
        return fallback;
    }

    return `${value.toLocaleString('vi-VN')}đ`;
}

function sanitizeNumberInput(value: string): string {
    return value.replace(/[^\d]/g, '');
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export default function CoursesPage() {

    const {
        courses,
        initial: initialCourses,
        status: coursesStatus,
        page,
        pageCount,
        setPage,
        fetchCourses,
        filterCourses,
    } = useCourseStore();
    const { filterProps, initial: initialFilterProps, status: filterStatus } = useCourseFilterStore();
    const categories = filterProps?.categories ?? [];
    const levels = filterProps?.levels ?? [];
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
    const [selectedLevelIds, setSelectedLevelIds] = useState<number[]>([]);
    const [priceMinInput, setPriceMinInput] = useState<string>('');
    const [priceMaxInput, setPriceMaxInput] = useState<string>('');
    const priceBoundMin = filterProps?.price?.min ?? 0;
    const rawPriceBoundMax = filterProps?.price?.max ?? 0;
    const priceBoundMax = rawPriceBoundMax > priceBoundMin ? rawPriceBoundMax : priceBoundMin + 1;
    const activeCategory = categories.find((item) => item.id === selectedCategoryId);
    const activeLevels = levels.filter(
        (item) => item.value !== undefined && selectedLevelIds.includes(item.value),
    );
    const selectedFilters = [
            activeCategory?.name,
            ...activeLevels.map((item) => item.label),
    ].filter((item): item is string => !!item);

    const hasAnyFilters = useMemo(() => {
        return selectedCategoryId !== undefined
            || selectedLevelIds.length > 0
            || priceMinInput.trim() !== ''
            || priceMaxInput.trim() !== '';
    }, [selectedCategoryId, selectedLevelIds, priceMinInput, priceMaxInput]);

    const parseOptionalNumber = (value: string): number | undefined => {
        const trimmed = sanitizeNumberInput(value.trim());
        if (trimmed === '') {
            return undefined;
        }

        const parsed = Number.parseInt(trimmed, 10);
        if (Number.isNaN(parsed)) {
            return undefined;
        }

        return parsed;
    };

    const parsedMinPrice = parseOptionalNumber(priceMinInput);
    const parsedMaxPrice = parseOptionalNumber(priceMaxInput);
    const sliderMinValue = clamp(
        parsedMinPrice ?? priceBoundMin,
        priceBoundMin,
        parsedMaxPrice ?? priceBoundMax,
    );
    const sliderMaxValue = clamp(
        parsedMaxPrice ?? priceBoundMax,
        sliderMinValue,
        priceBoundMax,
    );
    const sliderLeftPercent = ((sliderMinValue - priceBoundMin) / (priceBoundMax - priceBoundMin)) * 100;
    const sliderWidthPercent = ((sliderMaxValue - sliderMinValue) / (priceBoundMax - priceBoundMin)) * 100;

    const applyFilters = async (
        overrides?: {
            categoryId?: number;
            levelIds?: number[];
            priceMin?: string;
            priceMax?: string;
            page?: number;
        },
    ) => {
        const categoryId = overrides && 'categoryId' in overrides
            ? overrides.categoryId
            : selectedCategoryId;
        const levelIds = overrides && 'levelIds' in overrides
            ? (overrides.levelIds ?? [])
            : selectedLevelIds;
        const priceMinRaw = overrides && 'priceMin' in overrides
            ? (overrides.priceMin ?? '')
            : priceMinInput;
        const priceMaxRaw = overrides && 'priceMax' in overrides
            ? (overrides.priceMax ?? '')
            : priceMaxInput;
        const targetPage = overrides?.page ?? page;
        const priceMin = parseOptionalNumber(priceMinRaw);
        const priceMax = parseOptionalNumber(priceMaxRaw);

        if (
            categoryId === undefined
            && levelIds.length === 0
            && priceMin === undefined
            && priceMax === undefined
        ) {
            setPage(targetPage);
            await fetchCourses();
            return;
        }

        setPage(targetPage);
        await filterCourses(
            new CourseFilterRequest(
                categoryId,
                undefined,
                levelIds[0],
                priceMin,
                priceMax,
                undefined,
                targetPage,
            ),
        );
    };

    const visiblePages = useMemo(() => {
        if (pageCount <= 5) {
            return Array.from({ length: pageCount }, (_, index) => index + 1);
        }

        const start = Math.max(1, page - 2);
        const end = Math.min(pageCount, start + 4);
        const normalizedStart = Math.max(1, end - 4);
        const length = end - normalizedStart + 1;
        return Array.from({ length }, (_, index) => normalizedStart + index);
    }, [page, pageCount]);

    const handlePageChange = async (nextPage: number) => {
        if (nextPage < 1 || nextPage > pageCount || nextPage === page) {
            return;
        }

        await applyFilters({ page: nextPage });
    };

    useEffect(() => {
        initialCourses();
        initialFilterProps();
    }, []);

    useEffect(() => {
        if (coursesStatus === AppStatus.error || filterStatus === AppStatus.error) {
            toast.error('Không thể tải danh sách khóa học. Vui lòng thử lại.');
        }
    }, [coursesStatus, filterStatus]);

    return (
        <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-90)_0%,var(--sky-50)_52%,var(--white)_100%)] py-10">
            <Toaster position="top-right" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Khoá học</p>
                        <h1 className="mt-3 text-4xl font-semibold text-[color:var(--brand-900)]">Chọn khoá học phù hợp</h1>
                        <p className="mt-2 max-w-2xl text-muted-foreground">
                            Lộ trình được thiết kế theo mục tiêu cụ thể — từ giao tiếp cơ bản đến luyện thi chuyên sâu.
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        <Input placeholder="Tìm khóa học..." className="h-10 w-full sm:w-72" />
                        <AppButton size="icon" className="h-10 w-10 rounded-full">
                            <Search className="h-4 w-4 text-white" />
                            <span className="sr-only">Tìm kiếm</span>
                        </AppButton>
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2 lg:hidden">
                    {categories.map((category, index) => (
                        <Button key={category.id ?? index} variant="outline" size="sm" className="rounded-full">
                            {category.name ?? ''}
                        </Button>
                    ))}
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
                    <aside className="hidden lg:block">
                        <div className="sticky top-24 space-y-6">
                            <Card className="border-border/70 bg-white/90">
                                <CardContent className="space-y-6 px-5 py-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-[color:var(--brand-900)]">Bộ lọc</p>
                                            <p className="text-xs text-muted-foreground">Chọn để thu gọn kết quả</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-xs"
                                            onClick={async () => {
                                                setSelectedCategoryId(undefined);
                                                setSelectedLevelIds([]);
                                                setPriceMinInput('');
                                                setPriceMaxInput('');
                                                setPage(1);
                                                await fetchCourses();
                                            }}
                                        >
                                            Xoá lọc
                                        </Button>
                                    </div>

                                    <div className="rounded-2xl border border-border/70 bg-[color:var(--sky-60)] p-4">
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                            Đang chọn
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {selectedFilters.map((item) => (
                                                <span
                                                    key={item}
                                                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[color:var(--brand-900)] shadow-sm"
                                                >
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-border/70 bg-white p-4">
                                        <p className="text-sm font-semibold">Trình độ</p>
                                        <div className="mt-3 space-y-2">
                                            {levels.map((levelItem, index) => (
                                                <label key={levelItem.label ?? index} className="flex items-center justify-between text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-2">
                                                        <AppCheckBox
                                                            checked={levelItem.value !== undefined && selectedLevelIds.includes(levelItem.value)}
                                                            onCheckedChange={async () => {
                                                                if (levelItem.value === undefined) {
                                                                    return;
                                                                }

                                                                const nextLevelIds = selectedLevelIds.includes(levelItem.value)
                                                                    ? selectedLevelIds.filter((id) => id !== levelItem.value)
                                                                    : [...selectedLevelIds, levelItem.value];
                                                                setSelectedLevelIds(nextLevelIds);
                                                                await applyFilters({ levelIds: nextLevelIds, page: 1 });
                                                            }}
                                                        />
                                                        {levelItem.label ?? ''}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground/70">{levelItem.count ?? 0}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-border/70 bg-white p-4">
                                        <p className="text-sm font-semibold">Chủ đề</p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {categories.map((category, index) => (
                                                <button
                                                    key={category.id ?? index}
                                                    type="button"
                                                    onClick={async () => {
                                                        const nextCategoryId = selectedCategoryId === category.id
                                                            ? undefined
                                                            : category.id;
                                                        setSelectedCategoryId(nextCategoryId);
                                                        await applyFilters({ categoryId: nextCategoryId, page: 1 });
                                                    }}
                                                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${selectedCategoryId === category.id
                                                        ? 'border-primary/60 text-primary bg-primary/5'
                                                        : 'border-border/80 bg-white text-muted-foreground hover:border-primary/60 hover:text-primary'
                                                        }`}
                                                >
                                                    {category.name ?? ''}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-border/70 bg-white p-4">
                                        <p className="text-sm font-semibold">Thời lượng</p>
                                        <div className="mt-3 space-y-2">
                                            {durationFilters.map((item) => (
                                                <label key={item} className="flex items-center justify-between text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-2">
                                                        <AppCheckBox />
                                                        {item}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground/70">6</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-border/70 bg-white p-4">
                                        <p className="text-sm font-semibold">Mức giá</p>
                                        <div className="mt-3 grid grid-cols-2 gap-3">
                                            <Input
                                                placeholder={formatPricePlaceholder(filterProps?.price?.min, "Từ giá thấp")}
                                                value={priceMinInput}
                                                onChange={(event) => setPriceMinInput(sanitizeNumberInput(event.target.value))}
                                                onBlur={async () => {
                                                    await applyFilters({ page: 1 });
                                                }}
                                                onKeyDown={async (event) => {
                                                    if (event.key === 'Enter') {
                                                        await applyFilters({ page: 1 });
                                                    }
                                                }}
                                                className="h-9 text-xs"
                                            />
                                            <Input
                                                placeholder={formatPricePlaceholder(filterProps?.price?.max, "Đến giá cao")}
                                                value={priceMaxInput}
                                                onChange={(event) => setPriceMaxInput(sanitizeNumberInput(event.target.value))}
                                                onBlur={async () => {
                                                    await applyFilters({ page: 1 });
                                                }}
                                                onKeyDown={async (event) => {
                                                    if (event.key === 'Enter') {
                                                        await applyFilters({ page: 1 });
                                                    }
                                                }}
                                                className="h-9 text-xs"
                                            />
                                        </div>
                                        <div className="relative mt-3 h-6">
                                            <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-muted"></div>
                                            <div
                                                className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary/70"
                                                style={{
                                                    left: `${sliderLeftPercent}%`,
                                                    width: `${sliderWidthPercent}%`,
                                                }}
                                            ></div>
                                            <input
                                                type="range"
                                                min={priceBoundMin}
                                                max={priceBoundMax}
                                                value={sliderMinValue}
                                                onChange={(event) => {
                                                    const nextValue = Number.parseInt(event.target.value, 10);
                                                    const nextMin = Math.min(nextValue, sliderMaxValue);
                                                    setPriceMinInput(String(nextMin));
                                                }}
                                                onMouseUp={async () => {
                                                    await applyFilters({ page: 1 });
                                                }}
                                                onTouchEnd={async () => {
                                                    await applyFilters({ page: 1 });
                                                }}
                                                className="pointer-events-none absolute left-0 top-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary/70 [&::-webkit-slider-thumb]:bg-white"
                                            />
                                            <input
                                                type="range"
                                                min={priceBoundMin}
                                                max={priceBoundMax}
                                                value={sliderMaxValue}
                                                onChange={(event) => {
                                                    const nextValue = Number.parseInt(event.target.value, 10);
                                                    const nextMax = Math.max(nextValue, sliderMinValue);
                                                    setPriceMaxInput(String(nextMax));
                                                }}
                                                onMouseUp={async () => {
                                                    await applyFilters({ page: 1 });
                                                }}
                                                onTouchEnd={async () => {
                                                    await applyFilters({ page: 1 });
                                                }}
                                                className="pointer-events-none absolute left-0 top-0 h-6 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary/70 [&::-webkit-slider-thumb]:bg-white"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </aside>

                    <section className="space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-white/90 px-4 py-3 text-sm text-muted-foreground">
                            <span>Hiển thị {courses.length} khoá học {hasAnyFilters ? '(đã lọc)' : ''}</span>
                            <div className="flex items-center gap-2">
                                <span>Sắp xếp:</span>
                                <Button variant="outline" size="sm" className="rounded-full">
                                    Mới nhất
                                </Button>
                                <Button variant="ghost" size="sm" className="rounded-full">
                                    Phổ biến
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {courses.map((course) => (
                                <CourseCardItem
                                    key={course.id}
                                    title={course.name ?? ''}
                                    image={AppUtils.getStorageUrl(course.thumbnail)}
                                    rating={course.rating}
                                    students={course.learned}
                                    price={course.price}
                                    metaNote="Có phản hồi trực tiếp"
                                    href={`/courses/${course.id}`}
                                    className="shadow-[0_18px_50px_-45px_rgba(15,43,82,0.35)]"
                                    actionLabel="Xem Chi Tiết"
                                    actions={
                                        <>
                                            <AppButton asChild className="flex-1 rounded-full">
                                                <Link href={`/courses/${course.id}`}>Xem Chi Tiết</Link>
                                            </AppButton>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="group rounded-full bg-background hover:bg-background hover:text-foreground hover:border-primary/60"
                                                aria-label="Thêm vào giỏ"
                                            >
                                                <span className="sr-only">Thêm Vào Giỏ</span>
                                                <Image
                                                    src="https://img.icons8.com/ios/50/add-shopping-cart--v1.png"
                                                    alt=""
                                                    width={20}
                                                    height={20}
                                                    className="h-5 w-5"
                                                />
                                            </Button>
                                        </>
                                    }
                                />
                            ))}
                        </div>

                        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-border/70 bg-white/90 px-4 py-4 text-sm text-muted-foreground sm:flex-row">
                            <span>Trang {page} / {pageCount}</span>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={async () => {
                                        await handlePageChange(page - 1);
                                    }}
                                    disabled={page <= 1}
                                >
                                    Trước
                                </Button>
                                {visiblePages.map((pageNumber) => (
                                    pageNumber === page ? (
                                        <AppButton key={pageNumber} size="sm">{pageNumber}</AppButton>
                                    ) : (
                                        <Button
                                            key={pageNumber}
                                            variant="outline"
                                            size="sm"
                                            onClick={async () => {
                                                await handlePageChange(pageNumber);
                                            }}
                                        >
                                            {pageNumber}
                                        </Button>
                                    )
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={async () => {
                                        await handlePageChange(page + 1);
                                    }}
                                    disabled={page >= pageCount}
                                >
                                    Sau
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}
