"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useCouponStore } from "@/store/useCouponStore";
import { useRouter } from "next/navigation";
import {useEffect, useRef, useState} from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

function SuperAdminCouponsListingPage() {
    const { isLoading, couponList, fetchCoupons, deleteCoupon } = useCouponStore();
    const router = useRouter();
    const fetchCouponRef = useRef(false);
    const { toast } = useToast();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [couponToDelete, setCouponToDelete] = useState<string | null>(null);

    useEffect(() => {
        if (!fetchCouponRef.current) {
            fetchCoupons();
            fetchCouponRef.current = true;
        }
    }, [fetchCoupons]);

    const openDeleteModal = (couponId: string) => {
        setCouponToDelete(couponId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteCoupon = async () => {
        if (couponToDelete) {
            const result = await deleteCoupon(couponToDelete);
            if (result) {
                toast({
                    title: "Product deleted successfully",
                });
                await fetchCoupons();
            }
        }
        setIsDeleteModalOpen(false);
        setCouponToDelete(null);
    };

    if (isLoading) return null;

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col gap-6">
                <header className="flex items-center justify-between">
                    <h1>All Coupons</h1>
                    <Button onClick={() => router.push("/super-admin/coupons/add")}>
                        Add New Coupon
                    </Button>
                </header>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Usage</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {couponList.map((coupon) => (
                            <TableRow key={coupon.id}>
                                <TableCell>
                                    <p className="font-semibold">{coupon.code}</p>
                                </TableCell>
                                <TableCell>
                                    <p>{coupon.discountPercent}%</p>
                                </TableCell>
                                <TableCell>
                                    <p>
                                        {coupon.usageCount}/{coupon.usageLimit}
                                    </p>
                                </TableCell>
                                <TableCell>
                                    {format(new Date(coupon.startDate), "dd MMM yyyy")}
                                </TableCell>
                                <TableCell>
                                    {format(new Date(coupon.endDate), "dd MMM yyyy")}
                                </TableCell>
                                <TableCell>
                                    <Badge>
                                        {new Date(coupon.endDate) > new Date()
                                            ? "Active"
                                            : "Expired"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => openDeleteModal(coupon.id)}
                                        variant="ghost"
                                        size={"sm"}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteCoupon}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default SuperAdminCouponsListingPage;
