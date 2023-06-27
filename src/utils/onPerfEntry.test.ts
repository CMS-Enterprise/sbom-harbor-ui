import onPerfEntry from './onPerfEntry'

describe('onPerfEntry', () => {
  it('logs the provided entry to the console', () => {
    // Arrange
    const consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation()
    const testEntry = { name: 'test', duration: 100 }

    // Act
    onPerfEntry(testEntry)

    // Assert
    expect(consoleDebugSpy).toHaveBeenCalledWith(testEntry)

    // Clean up
    consoleDebugSpy.mockRestore()
  })
})
