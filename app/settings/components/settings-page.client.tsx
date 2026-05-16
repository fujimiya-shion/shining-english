"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AuthRequiredGuard } from "@/shared/components/auth/client-auth-guard";
import { Button } from "@/shared/components/ui/button";
import { AppButton } from "@/shared/components/ui/app-button";
import { Input } from "@/shared/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useSettingsStore } from "@/app/settings/stores/settings.store";
import { useAuthStore } from "@/shared/stores/auth.store";
import { useCityStore } from "@/shared/stores/city.store";
import { AppStatus } from "@/shared/enums/app-status";
import { CityAutocompleteSelect } from "@/app/settings/components/city-autocomplete-select";

export function SettingsPageClient() {
  const {
    status,
    name,
    phone,
    birthday,
    cityQuery,
    cityId,
    avatarFile,
    message,
    errorMessage,
    setName,
    setPhone,
    setBirthday,
    setCityQuery,
    setCity,
    setAvatarFile,
    loadFromAuth,
    clearFeedback,
    updateProfile,
  } = useSettingsStore();
  const cities = useCityStore((state) => state.cities);
  const citiesStatus = useCityStore((state) => state.status);
  const initialCities = useCityStore((state) => state.initial);

  const currentUser = useAuthStore((state) => state.currentUser);

  useEffect(() => {
    loadFromAuth();
  }, [currentUser, loadFromAuth]);
  useEffect(() => {
    void initialCities();
  }, [initialCities]);

  const initials = useMemo(() => {
    const source = currentUser?.name?.trim() || currentUser?.nickname?.trim() || "HV";
    return source
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
  }, [currentUser?.name, currentUser?.nickname]);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (avatarFile) {
      const objectUrl = URL.createObjectURL(avatarFile);
      setAvatarPreview(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    const avatar = currentUser?.avatar;
    if (!avatar) {
      setAvatarPreview(null);
      return;
    }

    setAvatarPreview(avatar);
  }, [avatarFile, currentUser?.avatar]);

  const isSubmitting = status === AppStatus.loading;

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await updateProfile();
  }

  return (
    <AuthRequiredGuard redirectTo="/login">
      <main className="min-h-full bg-[radial-gradient(1200px_circle_at_top_left,var(--sky-110)_0%,var(--sky-60)_50%,var(--white)_100%)] px-4 py-12">
        <div className="mx-auto w-full max-w-5xl">
          <div className="relative rounded-3xl border border-border/70 bg-white/95 shadow-[0_24px_70px_-50px_rgba(15,43,82,0.35)]">
            <Card className="border-0 bg-transparent shadow-none">
              <CardHeader className="space-y-2">
                <CardTitle className="text-3xl">Cập nhật hồ sơ</CardTitle>
                <CardDescription>
                  Chỉnh sửa thông tin cá nhân và ảnh đại diện.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" onSubmit={(event) => void onSubmit(event)}>
                <div className="space-y-6">
                  <div className="rounded-2xl border border-border/70 bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold text-[color:var(--brand-900)]">
                      Thông tin cá nhân
                    </p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="profile-name" className="text-sm font-medium">Họ và tên</label>
                        <Input
                          id="profile-name"
                          value={name}
                          onChange={(e) => {
                            clearFeedback();
                            setName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="profile-phone" className="text-sm font-medium">Số điện thoại</label>
                        <Input
                          id="profile-phone"
                          value={phone}
                          onChange={(e) => {
                            clearFeedback();
                            setPhone(e.target.value);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="profile-birthday" className="text-sm font-medium">Ngày sinh</label>
                        <Input
                          id="profile-birthday"
                          type="date"
                          value={birthday}
                          onChange={(e) => {
                            clearFeedback();
                            setBirthday(e.target.value);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="profile-city-name" className="text-sm font-medium">Thành phố</label>
                        <CityAutocompleteSelect
                          id="profile-city-name"
                          value={cityQuery}
                          cityId={cityId ? Number.parseInt(cityId, 10) : null}
                          options={cities}
                          disabled={citiesStatus === AppStatus.loading}
                          placeholder={citiesStatus === AppStatus.loading ? "Đang tải thành phố..." : "Nhập để tìm thành phố"}
                          onSearchChange={(value) => {
                            clearFeedback();
                            setCityQuery(value);
                          }}
                          onSelect={(city) => {
                            clearFeedback();
                            setCity(city);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl border border-border/70 bg-[color:var(--sky-70)] p-5">
                    <p className="text-sm font-semibold text-[color:var(--brand-900)]">Ảnh đại diện</p>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white text-xl font-semibold text-[color:var(--brand-900)] shadow-sm">
                        {avatarPreview ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={avatarPreview} alt="Avatar preview" className="h-full w-full object-cover" />
                        ) : (
                          initials
                        )}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Tải ảnh để cá nhân hóa hồ sơ học viên.</p>
                        <Input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            clearFeedback();
                            setAvatarFile(e.target.files?.[0] ?? null);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
                  {errorMessage ? <p className="text-sm text-rose-600">{errorMessage}</p> : null}
                </div>

                <div className="flex flex-wrap gap-3 lg:col-span-2">
                  <AppButton type="submit" className="h-11 rounded-full" disabled={isSubmitting}>
                    {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
                  </AppButton>
                  <Button asChild variant="outline" className="h-11 rounded-full">
                    <Link href="/profile">Xem hồ sơ</Link>
                  </Button>
                </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </AuthRequiredGuard>
  );
}
