import Swal from 'sweetalert2'
const SwalMixin = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const Toast = {
    success(text) {
        SwalMixin.fire({
            icon: 'success',
            title: text
        })
    },
    warning(text) {
        SwalMixin.fire({
            icon: 'warning',
            title: text
        })
    },
    info(text) {
        SwalMixin.fire({
            icon: 'info',
            title: text
        })
    },
    error(text) {
        SwalMixin.fire({
            icon: 'error',
            title: text
        })
    },
    confirmDelete(successCallback, t) {
        Swal.fire({
            title: t("Are you sure you want to delete this record?"),
            showDenyButton: true,
            confirmButtonText: t("Yes"),
            denyButtonText: t("No"),
        }).then((result) => {
            if (result.isConfirmed) {
                successCallback()
            }
        });
    },
    dynamicTitle(successCallback, t,title) {
        Swal.fire({
            title: t(`${title}`),
            showDenyButton: true,
            confirmButtonText: t("Yes"),
            denyButtonText: t("No"),
        }).then((result) => {
            if (result.isConfirmed) {
                successCallback()
            }
        });
    }, 
}

export default Toast