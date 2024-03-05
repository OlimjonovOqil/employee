const { prisma } = require('../prisma/prisma-client')

const allEmployees = async (req, res) => {
	try {
		// const { id } = req.params
		// const employees = await prisma.employee.findMany({
		// 	where: { userId: id },
		// })
		const employees = await prisma.employee.findMany()

		res.status(200).json(employees)
	} catch (error) {
		return res.status(500).json({ message: 'Не удалось найти сотрудников' })
	}
}

const addEmployee = async (req, res) => {
	try {
		const data = req.body
		if (!data.firstName || !data.lastName || !data.address || !data.age) {
			return res.status(400).json({ message: 'Все поля обязательны' })
		}

		const employee = await prisma.employee.create({
			data: { ...data, userId: req.user.id },
		})

		return res.status(200).json(employee)
	} catch (error) {
		res.status(500).json({ message: 'Что-то пошло не так при добавлении' })
	}
}

const removeEmployee = async (req, res) => {
	try {
		const { id } = req.params
		await prisma.employee.delete({
			where: { id },
		})

		res.status(204).json('OK')
	} catch (error) {
		res.status(500).json({ message: 'Не удалось удалить сотрудника' })
	}
}

const editEmployee = async (req, res) => {
	try {
		const data = req.body
		const { id } = req.params
		await prisma.employee.update({
			where: { id },
			data,
		})

		res.status(204).json({ message: 'OK!' })
	} catch (error) {
		res.status(500).json({ message: 'Не удалось изменить данные сотрудника' })
	}
}

const getEmployee = async (req, res) => {
	try {
		const { id } = req.params
		console.log(id);
		const employee = await prisma.employee.findUnique({
			where: { id },
		})

		res.status(200).json(employee)
	} catch (error) {
		res.status(500).json({ message: 'Не удалось найти сотрудника' })
	}
}

module.exports = {
	allEmployees,
	addEmployee,
	removeEmployee,
	editEmployee,
	getEmployee,
}
